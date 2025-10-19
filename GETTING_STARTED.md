# Getting Started with CipherStudio

Welcome to CipherStudio! This guide will help you get started with the browser-based React IDE.

## Quick Start

### 1. Access CipherStudio

Visit [cipherstudio.vercel.app](https://cipherstudio.vercel.app) or run locally:

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open [http://localhost:3000](http://localhost:3000)

### 2. Create Your First Project

1. Click the "New" button in the header
2. A new project will be created with a default App.jsx file
3. Start editing the code in the editor panel
4. See changes live in the preview panel

### 3. Create Files

1. Click the "+" button in the file explorer
2. Enter a filename (e.g., \`components/Button.jsx\`)
3. Press Enter to create
4. Start coding!

### 4. Save Your Work

- Projects auto-save every second
- Click "Save" to manually save
- Use "Projects" button to manage all your projects

## Common Tasks

### Import React Components

\`\`\`jsx
import React from 'react'

export default function MyComponent() {
  return <div>Hello World</div>
}
\`\`\`

### Use React Hooks

\`\`\`jsx
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
\`\`\`

### Style Components

\`\`\`jsx
export default function StyledComponent() {
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333'
    }
  }
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Styled Component</h1>
    </div>
  )
}
\`\`\`

### Use External Libraries

Sandpack supports many popular libraries:

\`\`\`jsx
// Lodash
import _ from 'lodash'

// Date-fns
import { format } from 'date-fns'

// Axios
import axios from 'axios'
\`\`\`

## Tips & Tricks

### Keyboard Shortcuts
- \`Ctrl/Cmd + S\` - Save project
- \`Ctrl/Cmd + /\` - Comment/uncomment code
- \`Tab\` - Indent code
- \`Shift + Tab\` - Unindent code

### Best Practices
1. Keep components small and focused
2. Use meaningful file names
3. Organize files in folders
4. Comment your code
5. Test frequently in preview

### Debugging
1. Check the browser console for errors
2. Use \`console.log()\` for debugging
3. Check the preview panel for runtime errors
4. Verify imports are correct

## Project Structure Example

\`\`\`
MyApp/
├── App.jsx (main component)
├── index.js (entry point)
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Card.jsx
├── styles/
│   └── globals.css
└── utils/
    └── helpers.js
\`\`\`

## Limitations

- No backend API calls (use mock data)
- No file system access
- Limited to browser storage
- No npm package installation
- No terminal access

## Next Steps

1. Create a simple React component
2. Add interactivity with hooks
3. Build a multi-component app
4. Share your project
5. Deploy to production

## Resources

- [React Documentation](https://react.dev)
- [Sandpack Documentation](https://sandpack.codesandbox.io/)
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Support

Need help? Contact us at support@cipherschools.com or visit our documentation.
