# CipherStudio - Browser-Based React IDE

CipherStudio is a powerful, browser-based IDE for writing, running, and saving React code directly in your browser. Similar to CodeSandbox and NextLeap.js, it provides a complete development environment with live preview, file management, and project persistence.

## Features

### Core Features
- **File Management** - Create, delete, rename, and organize project files
- **Code Editor** - Rich code editor with syntax highlighting and line numbers
- **Live Preview** - Real-time React code execution using Sandpack
- **Project Management** - Create, load, and manage multiple projects
- **Auto-Save** - Automatic project persistence to localStorage
- **Responsive UI** - Works seamlessly on desktop and tablet screens

### Bonus Features
- **Dark Theme** - Professional dark theme optimized for coding
- **Copy Code** - Quick copy-to-clipboard functionality
- **Folder Organization** - Organize files in nested folders
- **Project Metadata** - Track file count and project creation time

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ with React 18
- **Editor**: Custom textarea-based editor with line numbers
- **Code Execution**: Sandpack by CodeSandbox
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks with localStorage

### Backend (Optional)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **File Storage**: AWS S3
- **Authentication**: JWT

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/cipherstudio.git
cd cipherstudio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating a Project
1. Click the "New" button in the header
2. A new project will be created with a default App.jsx file

### Creating Files
1. Click the "+" button in the file explorer
2. Enter the filename (e.g., `components/Button.jsx`)
3. Press Enter to create the file

### Editing Code
1. Select a file from the file explorer
2. Edit the code in the editor panel
3. Changes are automatically reflected in the preview

### Saving Projects
- Projects are automatically saved to localStorage every second
- Click "Save" to manually save the current project
- Use the "Projects" button to manage all your projects

### Managing Projects
1. Click the "Projects" button in the header
2. View all your projects
3. Load, rename, or delete projects as needed

## Project Structure

\`\`\`
cipherstudio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── code-editor.tsx
│   ├── file-explorer.tsx
│   ├── project-header.tsx
│   └── project-manager.tsx
├── types/
│   └── index.ts
├── public/
├── package.json
└── tsconfig.json
\`\`\`

## API Reference

### Project Object
\`\`\`typescript
interface Project {
  id: string
  name: string
  files: Record<string, FileNode>
}

interface FileNode {
  code: string
  type: "file" | "folder"
}
\`\`\`

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy with one click

\`\`\`bash
vercel deploy
\`\`\`

### Deploy Backend

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for backend deployment instructions.

## Future Enhancements

- [ ] User authentication and cloud sync
- [ ] Real-time collaboration
- [ ] Code sharing and public projects
- [ ] Package.json dependency management
- [ ] Terminal/console output
- [ ] Deployment to Vercel/Netlify
- [ ] Theme customization
- [ ] Keyboard shortcuts
- [ ] Code formatting (Prettier)
- [ ] Linting (ESLint)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions, please open an issue on GitHub or contact support@cipherschools.com

## Acknowledgments

- Built with [Sandpack](https://sandpack.codesandbox.io/) by CodeSandbox
- Inspired by [CodeSandbox](https://codesandbox.io/) and [NextLeap.js](https://nextleap.js.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
