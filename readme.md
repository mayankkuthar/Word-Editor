# Canvas Word Editor 📝

A modern, feature-rich word processor built entirely with HTML5 Canvas, CSS, and vanilla JavaScript. Experience smooth text editing with professional-grade features in your browser.

## ✨ Features

### Core Text Editing

* **Real-time Text Input** : Natural typing experience with proper cursor management
* **Multi-line Support** : Full line management with Enter key support
* **Cursor Navigation** : Arrow keys, Home/End navigation
* **Text Selection** : Click-to-position cursor anywhere in the document

### Rich Text Formatting

* **Font Controls** : Multiple font families and customizable font sizes (8px - 72px)
* **Text Styling** : Bold, Italic, and Underline formatting
* **Text Alignment** : Left, Center, and Right alignment options
* **Color Support** : Text color and background color customization

### Advanced Features

* **Undo/Redo** : Full history management with 50-state memory
* **Keyboard Shortcuts** :
* `Ctrl+B` - Bold
* `Ctrl+I` - Italic
* `Ctrl+U` - Underline
* `Ctrl+Z` - Undo
* `Ctrl+Y` - Redo
* **Export Functionality** : Save your document as PNG image
* **Real-time Statistics** : Live word count, character count, and cursor position
* **IME Support** : International input method support for global users

### User Experience

* **Modern UI** : Glassmorphism design with smooth animations
* **Responsive Design** : Works on desktop and mobile devices
* **Visual Feedback** : Active button states and hover effects
* **Status Bar** : Real-time document statistics and cursor information

## 🚀 Quick Start

### Option 1: Try it Online

**[🔗 Live Demo - Try the Editor Now!](https://mayankkuthar.github.io/Word-Editor/)**

*Click the link above to experience the Canvas Word Editor in action*

### Option 2: Local Installation

1. **Clone or Download** the project files
2. **Extract** the files to your desired directory
3. **Open** `index.html` in your web browser
4. **Start Writing!** Click in the editor area and begin typing

## 📁 Project Structure

<pre><div class="relative group/copy rounded-lg"><div class="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right"><div class="absolute right-0 h-8 px-2 items-center inline-flex"><button class="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none text-text-300
          border-transparent
          transition
          font-styrene
          duration-300
          ease-[cubic-bezier(0.165,0.85,0.45,1)]
          hover:bg-bg-400
          aria-pressed:bg-bg-400
          aria-checked:bg-bg-400
          aria-expanded:bg-bg-300
          hover:text-text-100
          aria-pressed:text-text-100
          aria-checked:text-text-100
          aria-expanded:text-text-100 h-8 w-8 rounded-md active:scale-95 backdrop-blur-md" type="button" aria-label="Copy to clipboard" data-state="closed"><div class="relative"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="transition-all opacity-100 scale-100"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" class="absolute top-0 left-0 transition-all opacity-0 scale-50"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg></div></button></div></div><div class=""><pre class="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed"><code><span><span>canvas-word-editor/
</span></span><span>├── index.html          # Main HTML structure
</span><span>├── styles.css          # Complete styling and responsive design
</span><span>├── script.js           # Core editor functionality and logic
</span><span>└── README.md          # This documentation file</span></code></pre></div></div></pre>

## 🛠️ Technical Implementation

### Architecture

* **Pure Vanilla JavaScript** : No external dependencies
* **HTML5 Canvas** : All text rendering handled by canvas 2D context
* **Event-Driven** : Comprehensive keyboard and mouse event handling
* **Object-Oriented** : Clean class-based architecture

### Key Classes

* `CanvasWordEditor`: Main editor class handling all functionality
  * Text management and rendering
  * Cursor positioning and animation
  * Event handling and user interaction
  * History management for undo/redo
  * Export and utility functions

### Browser Compatibility

* ✅ Chrome 60+
* ✅ Firefox 55+
* ✅ Safari 12+
* ✅ Edge 79+

## 🎯 Usage Guide

### Getting Started

1. Click anywhere in the white canvas area to focus the editor
2. Start typing - the cursor will follow your text naturally
3. Use the toolbar buttons to format your text
4. Press Enter to create new lines

### Keyboard Shortcuts

<pre class="font-styrene border-border-100/50 overflow-x-scroll w-full rounded border-[0.5px] shadow-[0_2px_12px_hsl(var(--always-black)/5%)]"><table class="bg-bg-100 min-w-full border-separate border-spacing-0 text-sm leading-[1.88888] whitespace-normal"><thead class="border-b-border-100/50 border-b-[0.5px] text-left"><tr class="[tbody>&]:odd:bg-bg-500/10"><th class="text-text-000 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] font-400 px-2 [&:not(:first-child)]:border-l-[0.5px]">Shortcut</th><th class="text-text-000 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] font-400 px-2 [&:not(:first-child)]:border-l-[0.5px]">Action</th></tr></thead><tbody><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]"><code class="bg-text-200/5 border border-0.5 border-border-300 text-danger-000 whitespace-pre-wrap rounded-[0.4rem] px-1 py-px text-[0.9rem]">Ctrl+B</code></td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Toggle Bold</td></tr><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]"><code class="bg-text-200/5 border border-0.5 border-border-300 text-danger-000 whitespace-pre-wrap rounded-[0.4rem] px-1 py-px text-[0.9rem]">Ctrl+I</code></td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Toggle Italic</td></tr><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]"><code class="bg-text-200/5 border border-0.5 border-border-300 text-danger-000 whitespace-pre-wrap rounded-[0.4rem] px-1 py-px text-[0.9rem]">Ctrl+U</code></td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]">Toggle Underline</td></tr><tr class="[tbody>&]:odd:bg-bg-500/10"><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]"></td><td class="border-t-border-100/50 [&:not(:first-child)]:-x-[hsla(var(--border-100) / 0.5)] border-t-[0.5px] px-2 [&:not(:first-child)]:border-l-[0.5px]"></td></tr></tbody></table></pre>
