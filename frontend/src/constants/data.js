// ï    using this character to identify the place for conditional redering of secondary languages.
//      For example: Tailwind code can be added in HTML only where this character is present

const javascript = {
    snippets: [
        `function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  console.log(factorial(5));`,
    ],
    subLanguage: {
    },
};

const html = {
    snippets: [
        `<!DOCTYPE html>
  <html>
    <head>
      <title>Sample Page</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
      <p>This is a sample HTML snippet.</p>
    </body>
  </html>`,
    ],
    subLanguage: {
    },
};

const css = {
    snippets: [
        `body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
  }

  h1 {
    color: #333;
    text-align: center;
  }

  p {
    font-size: 16px;
    color: #666;
  }`,
    ],
    subLanguage: {
    },
};

const react = {
    snippets: [
        `import React from "react";

function HelloWorld() {
  return (
    <div ï>
      <h1 ï>Hello, React!</h1>
      <p ï>This is a sample React component.</p>
    </div>
  );
}

export default HelloWorld;`,
    ],
    subLanguage: {
        Tailwind: [
            `className="bg-blue-500 text-white px-4 py-2 rounded" `,
            `className="flex items-center justify-between p-4" `,
            `className="text-xl font-semibold text-gray-800" `,
            `className="hover:bg-gray-200 transition duration-300" `,
            `className="w-full max-w-md mx-auto mt-10" `,
        ]
    },
};

const data = {
    Javascript: javascript,
    HTML: html,
    CSS: css,
    React: react,
};

export default data;
