class CanvasWordEditor {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.lines = [''];
        this.cursorLine = 0;
        this.cursorCol = 0;
        this.cursorVisible = true;
        this.cursorBlinkTimer = null;
        this.isComposing = false;
        
        // Text formatting
        this.currentFormat = {
            fontFamily: 'Arial',
            fontSize: 16,
            bold: false,
            italic: false,
            underline: false,
            color: '#000000',
            align: 'left'
        };
        
        // Editor state
        this.lineHeight = 24;
        this.padding = 20;
        this.backgroundColor = '#ffffff';
        this.selection = null;
        this.isDragging = false;
        
        // History for undo/redo
        this.history = [];
        this.historyIndex = -1;
        this.maxHistory = 50;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startCursorBlink();
        this.saveState();
        this.render();
    }
    
    setupEventListeners() {
        // Canvas events
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keypress', (e) => this.handleKeyPress(e));
        
        // Composition events for IME
        this.canvas.addEventListener('compositionstart', () => this.isComposing = true);
        this.canvas.addEventListener('compositionend', (e) => {
            this.isComposing = false;
            if (e.data) {
                this.insertText(e.data);
            }
        });
        
        // Toolbar events
        this.setupToolbarEvents();
        
        // Focus management
        this.canvas.setAttribute('tabindex', '0');
        this.canvas.addEventListener('focus', () => this.startCursorBlink());
        this.canvas.addEventListener('blur', () => this.stopCursorBlink());
    }
    
    setupToolbarEvents() {
        // Font controls
        document.getElementById('fontFamily').addEventListener('change', (e) => {
            this.currentFormat.fontFamily = e.target.value;
            this.render();
        });
        
        document.getElementById('fontSize').addEventListener('change', (e) => {
            this.currentFormat.fontSize = parseInt(e.target.value);
            this.lineHeight = this.currentFormat.fontSize + 8;
            this.render();
        });
        
        // Format buttons
        document.getElementById('boldBtn').addEventListener('click', () => {
            this.currentFormat.bold = !this.currentFormat.bold;
            this.updateButtonState('boldBtn', this.currentFormat.bold);
            this.render();
        });
        
        document.getElementById('italicBtn').addEventListener('click', () => {
            this.currentFormat.italic = !this.currentFormat.italic;
            this.updateButtonState('italicBtn', this.currentFormat.italic);
            this.render();
        });
        
        document.getElementById('underlineBtn').addEventListener('click', () => {
            this.currentFormat.underline = !this.currentFormat.underline;
            this.updateButtonState('underlineBtn', this.currentFormat.underline);
            this.render();
        });
        
        // Alignment
        ['alignLeft', 'alignCenter', 'alignRight'].forEach(id => {
            document.getElementById(id).addEventListener('click', () => {
                const align = id.replace('align', '').toLowerCase();
                this.currentFormat.align = align;
                this.updateAlignmentButtons(align);
                this.render();
            });
        });
        
        // Colors
        document.getElementById('textColor').addEventListener('change', (e) => {
            this.currentFormat.color = e.target.value;
            this.render();
        });
        
        document.getElementById('bgColor').addEventListener('change', (e) => {
            this.backgroundColor = e.target.value;
            this.render();
        });
        
        // Actions
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());
        document.getElementById('clearBtn').addEventListener('click', () => this.clear());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportImage());
    }
    
    updateButtonState(buttonId, active) {
        const btn = document.getElementById(buttonId);
        btn.classList.toggle('active', active);
    }
    
    updateAlignmentButtons(activeAlign) {
        ['alignLeft', 'alignCenter', 'alignRight'].forEach(id => {
            const align = id.replace('align', '').toLowerCase();
            this.updateButtonState(id, align === activeAlign);
        });
    }
    
    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.setCursorFromPosition(x, y);
        this.canvas.focus();
        this.render();
    }
    
    handleMouseDown(e) {
        this.isDragging = true;
        this.handleClick(e);
    }
    
    handleMouseMove(e) {
        if (this.isDragging) {
            // Selection logic would go here
        }
    }
    
    handleMouseUp(e) {
        this.isDragging = false;
    }
    
    setCursorFromPosition(x, y) {
        const line = Math.floor((y - this.padding) / this.lineHeight);
        this.cursorLine = Math.max(0, Math.min(line, this.lines.length - 1));
        
        // Estimate column position
        const text = this.lines[this.cursorLine];
        this.ctx.font = this.getFontString();
        
        // Get the starting X position for this line based on alignment
        const fullLineWidth = this.ctx.measureText(text).width;
        const lineStartX = this.getTextX(fullLineWidth);
        
        let bestCol = 0;
        let minDistance = Infinity;
        
        for (let i = 0; i <= text.length; i++) {
            const textBeforeCursor = text.substring(0, i);
            const textBeforeCursorWidth = this.ctx.measureText(textBeforeCursor).width;
            const cursorX = lineStartX + textBeforeCursorWidth;
            const distance = Math.abs(x - cursorX);
            
            if (distance < minDistance) {
                minDistance = distance;
                bestCol = i;
            }
        }
        
        this.cursorCol = bestCol;
    }
    
    handleKeyDown(e) {
        if (this.isComposing) return;
        
        // Handle shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    document.getElementById('boldBtn').click();
                    return;
                case 'i':
                    e.preventDefault();
                    document.getElementById('italicBtn').click();
                    return;
                case 'u':
                    e.preventDefault();
                    document.getElementById('underlineBtn').click();
                    return;
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                    return;
                case 'y':
                    e.preventDefault();
                    this.redo();
                    return;
            }
        }
        
        // Handle special keys
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                this.insertNewLine();
                break;
            case 'Backspace':
                e.preventDefault();
                this.handleBackspace();
                break;
            case 'Delete':
                e.preventDefault();
                this.handleDelete();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.moveCursor(-1, 0);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.moveCursor(1, 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.moveCursor(0, -1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.moveCursor(0, 1);
                break;
            case 'Home':
                e.preventDefault();
                this.cursorCol = 0;
                this.render();
                break;
            case 'End':
                e.preventDefault();
                this.cursorCol = this.lines[this.cursorLine].length;
                this.render();
                break;
        }
    }
    
    handleKeyPress(e) {
        if (this.isComposing) return;
        if (e.ctrlKey || e.metaKey) return;
        if (e.key.length === 1) {
            e.preventDefault();
            this.insertText(e.key);
        }
    }
    
    insertText(text) {
        const line = this.lines[this.cursorLine];
        const newLine = line.substring(0, this.cursorCol) + text + line.substring(this.cursorCol);
        this.lines[this.cursorLine] = newLine;
        this.cursorCol += text.length;
        this.saveState();
        this.render();
        this.updateStatus();
    }
    
    insertNewLine() {
        const line = this.lines[this.cursorLine];
        const beforeCursor = line.substring(0, this.cursorCol);
        const afterCursor = line.substring(this.cursorCol);
        
        this.lines[this.cursorLine] = beforeCursor;
        this.lines.splice(this.cursorLine + 1, 0, afterCursor);
        this.cursorLine++;
        this.cursorCol = 0;
        this.saveState();
        this.render();
        this.updateStatus();
    }
    
    handleBackspace() {
        if (this.cursorCol > 0) {
            const line = this.lines[this.cursorLine];
            this.lines[this.cursorLine] = line.substring(0, this.cursorCol - 1) + line.substring(this.cursorCol);
            this.cursorCol--;
        } else if (this.cursorLine > 0) {
            const currentLine = this.lines[this.cursorLine];
            const prevLine = this.lines[this.cursorLine - 1];
            this.cursorCol = prevLine.length;
            this.lines[this.cursorLine - 1] = prevLine + currentLine;
            this.lines.splice(this.cursorLine, 1);
            this.cursorLine--;
        }
        this.saveState();
        this.render();
        this.updateStatus();
    }
    
    handleDelete() {
        const line = this.lines[this.cursorLine];
        if (this.cursorCol < line.length) {
            this.lines[this.cursorLine] = line.substring(0, this.cursorCol) + line.substring(this.cursorCol + 1);
        } else if (this.cursorLine < this.lines.length - 1) {
            const nextLine = this.lines[this.cursorLine + 1];
            this.lines[this.cursorLine] = line + nextLine;
            this.lines.splice(this.cursorLine + 1, 1);
        }
        this.saveState();
        this.render();
        this.updateStatus();
    }
    
    moveCursor(deltaCol, deltaLine) {
        if (deltaLine !== 0) {
            const newLine = Math.max(0, Math.min(this.cursorLine + deltaLine, this.lines.length - 1));
            if (newLine !== this.cursorLine) {
                this.cursorLine = newLine;
                this.cursorCol = Math.min(this.cursorCol, this.lines[this.cursorLine].length);
            }
        } else {
            const newCol = this.cursorCol + deltaCol;
            if (newCol >= 0 && newCol <= this.lines[this.cursorLine].length) {
                this.cursorCol = newCol;
            }
        }
        this.render();
    }
    
    getFontString() {
        let font = '';
        if (this.currentFormat.italic) font += 'italic ';
        if (this.currentFormat.bold) font += 'bold ';
        font += `${this.currentFormat.fontSize}px ${this.currentFormat.fontFamily}`;
        return font;
    }
    
    getTextX(textWidth) {
        switch (this.currentFormat.align) {
            case 'center':
                return (this.canvas.width - textWidth) / 2;
            case 'right':
                return this.canvas.width - this.padding - textWidth;
            default:
                return this.padding;
        }
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set font
        this.ctx.font = this.getFontString();
        this.ctx.fillStyle = this.currentFormat.color;
        this.ctx.textBaseline = 'top';
        
        // Render text
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i];
            const y = this.padding + i * this.lineHeight;
            const textWidth = this.ctx.measureText(line).width;
            const x = this.getTextX(textWidth);
            
            this.ctx.fillText(line, x, y);
            
            // Draw underline if needed
            if (this.currentFormat.underline && line) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + this.currentFormat.fontSize + 2);
                this.ctx.lineTo(x + textWidth, y + this.currentFormat.fontSize + 2);
                this.ctx.strokeStyle = this.currentFormat.color;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
        }
        
        // Draw cursor
        if (this.cursorVisible) {
            this.drawCursor();
        }
    }
    
    drawCursor() {
        const line = this.lines[this.cursorLine];
        const textBeforeCursor = line.substring(0, this.cursorCol);
        this.ctx.font = this.getFontString();
        const textBeforeCursorWidth = this.ctx.measureText(textBeforeCursor).width;
        
        // Get the starting X position for the line based on alignment
        const fullLineWidth = this.ctx.measureText(line).width;
        const lineStartX = this.getTextX(fullLineWidth);
        
        // Position cursor after the text before cursor position
        const x = lineStartX + textBeforeCursorWidth;
        const y = this.padding + this.cursorLine * this.lineHeight;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + this.currentFormat.fontSize);
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    startCursorBlink() {
        this.stopCursorBlink();
        this.cursorVisible = true;
        this.cursorBlinkTimer = setInterval(() => {
            this.cursorVisible = !this.cursorVisible;
            this.render();
        }, 530);
    }
    
    stopCursorBlink() {
        if (this.cursorBlinkTimer) {
            clearInterval(this.cursorBlinkTimer);
            this.cursorBlinkTimer = null;
        }
        this.cursorVisible = false;
    }
    
    saveState() {
        const state = {
            lines: [...this.lines],
            cursorLine: this.cursorLine,
            cursorCol: this.cursorCol,
            format: {...this.currentFormat}
        };
        
        // Remove states after current index
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(state);
        
        // Limit history size
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        } else {
            this.historyIndex++;
        }
    }
    
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreState(this.history[this.historyIndex]);
        }
    }
    
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.restoreState(this.history[this.historyIndex]);
        }
    }
    
    restoreState(state) {
        this.lines = [...state.lines];
        this.cursorLine = state.cursorLine;
        this.cursorCol = state.cursorCol;
        this.currentFormat = {...state.format};
        this.render();
        this.updateStatus();
    }
    
    clear() {
        this.lines = [''];
        this.cursorLine = 0;
        this.cursorCol = 0;
        this.saveState();
        this.render();
        this.updateStatus();
    }
    
    exportImage() {
        const link = document.createElement('a');
        link.download = 'document.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }
    
    updateStatus() {
        const wordCount = this.lines.join(' ').split(/\s+/).filter(word => word.length > 0).length;
        const charCount = this.lines.join('\n').length;
        document.getElementById('statusText').textContent = 
            `Line ${this.cursorLine + 1}, Column ${this.cursorCol + 1} | ${wordCount} words, ${charCount} characters`;
    }
}

// Initialize the editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const editor = new CanvasWordEditor('editorCanvas');
});