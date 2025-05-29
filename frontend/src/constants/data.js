const javascript = [
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

  console.log(factorial(5));`
];

const html = [
  `<!DOCTYPE html>
  <html>
    <head>
      <title>Sample Page</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
      <p>This is a sample HTML snippet.</p>
    </body>
  </html>`
];

const css = [
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
  }`
];


const data = {
    Javascript: javascript,
    HTML: html,
    CSS: css,
};

export default data;