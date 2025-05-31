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

        `function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

console.log(isPalindrome('racecar'));`,

        `const sumArray = (arr) => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

console.log(sumArray([1, 2, 3, 4]));`,

        `for (let i = 1; i <= 5; i++) {
  let row = '';
  for (let j = 1; j <= i; j++) {
    row += '* ';
  }
  console.log(row);
}`,

        `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6));`,

        `const person = {
  name: 'Alice',
  greet() {
    console.log(\`Hello, my name is \${this.name}\`);
  }
};

person.greet();`,

        `function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}`,

        `const fetchData = async () => {
  try {
    const res = await fetch('https://api.example.com/data');
    const json = await res.json();
    console.log(json);
  } catch (err) {
    console.error(err);
  }
};

fetchData();`,
    ],
    subLanguage: {},
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

        `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Basic HTML5</title>
  </head>
  <body>
    <header>
      <h1>Welcome to my site</h1>
    </header>
    <footer>
      <p>Copyright © 2025</p>
    </footer>
  </body>
</html>`,

        `<!DOCTYPE html>
<html>
  <head>
    <title>Form Example</title>
  </head>
  <body>
    <form action="/submit" method="POST">
      <label for="name">Name:</label>
      <input id="name" name="name" type="text" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`,

        `<!DOCTYPE html>
<html>
  <head>
    <title>Image Example</title>
  </head>
  <body>
    <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
    <figcaption>Sample image caption</figcaption>
  </body>
</html>`,

        `<!DOCTYPE html>
<html>
  <head>
    <title>List Example</title>
  </head>
  <body>
    <ul>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </ul>
  </body>
</html>`,

        `<!DOCTYPE html>
<html>
  <head>
    <title>Table Example</title>
  </head>
  <body>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alice</td>
          <td>25</td>
        </tr>
        <tr>
          <td>Bob</td>
          <td>30</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,

        `<!DOCTYPE html>
<html>
  <head>
    <title>Link Example</title>
  </head>
  <body>
    <a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit Example</a>
  </body>
</html>`,

        `<!DOCTYPE html>
<html>
  <head>
    <title>Semantic HTML</title>
  </head>
  <body>
    <article>
      <h2>Article Title</h2>
      <p>This is a semantic HTML5 article section.</p>
    </article>
  </body>
</html>`,
    ],
    subLanguage: {},
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

        `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}`,

        `button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background-color: #0056b3;
}`,

        `nav {
  background-color: #333;
  color: white;
  padding: 15px;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}
nav ul li a {
  color: white;
  text-decoration: none;
}`,

        `.card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  border-radius: 8px;
  background-color: white;
}`,

        `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`,

        `@media (max-width: 768px) {
  body {
    background-color: #e0e0e0;
  }
  .container {
    padding: 10px;
  }
}`,

        `.text-center {
  text-align: center;
}

.bold {
  font-weight: bold;
}

.italic {
  font-style: italic;
}`,
    ],
    subLanguage: {},
};

const react = {
    snippets: [
        `import React from "react";

function HelloWorld() {
  return (
    <div ï>
      <h1 ï>
        Hello, React!
      </h1>
      <p ï>
        This is a sample React component.
      </p>
    </div>
  );
}

export default HelloWorld;`,

        `import React from "react";

const Button = () => {
  return (
    <button ï>
      Click Me
    </button>
  );
};

export default Button;`,

        `import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div ï>
      <p ï>
        Count: {count}
      </p>
      <button onClick={() => setCount(count + 1)} ï>
        Increment
      </button>
    </div>
  );
}

export default Counter;`,

        `import React from "react";

function Card({ title, description }) {
  return (
    <div ï>
      <h2 ï>
        {title}
      </h2>
      <p ï>
        {description}
      </p>
    </div>
  );
}

export default Card;`,

        `import React, { useEffect } from "react";

function Logger() {
  useEffect(() => {
    console.log("Component mounted");
  }, []);
  return (
    <div ï>
      Check the console
    </div>
  );
}

export default Logger;`,

        `import React from "react";

const Profile = ({ name, bio }) => (
  <section ï>
    <h1 ï>
      {name}
    </h1>
    <p ï>
      {bio}
    </p>
  </section>
);

export default Profile;`,

        `import React from "react";

function List({ items }) {
  return (
    <ul ï>
      {items.map((item, index) => (
        <li key={index} ï>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default List;`,

        `import React from "react";

const Banner = () => (
  <header ï>
    <h1 ï>
      Welcome to Our Site
    </h1>
    <p ï>
      We build amazing apps
    </p>
  </header>
);

export default Banner;`,
    ],
    subLanguage: {
        Tailwind: [
            `className="bg-blue-500 text-white px-4 py-2 rounded"`,
            `className="flex items-center justify-between p-4"`,
            `className="text-xl font-semibold text-gray-800"`,
            `className="hover:bg-gray-200 transition duration-300"`,
            `className="w-full max-w-md mx-auto mt-10"`,
            `className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"`,
            `className="text-sm text-gray-500 italic"`,
            `className="grid grid-cols-3 gap-4 p-4"`,
            `className="rounded-lg shadow-lg p-6 bg-white"`,
            `className="uppercase tracking-wide text-indigo-500 font-bold"`,
            `className="max-w-screen-md mx-auto my-8"`,
            `className="border border-dashed border-gray-400 p-6"`,
            `className="fixed bottom-0 right-0 m-4 text-white bg-black p-2 rounded"`,
            `className="text-center text-2xl font-black text-blue-600"`,
            `className="transition-transform transform hover:scale-105"`,
            `className="focus:outline-none focus:ring-2 focus:ring-blue-500"`,
            `className="dark:bg-gray-800 dark:text-white"`,
            `className="aspect-video object-cover rounded-xl"`,
            `className="opacity-50 hover:opacity-100 transition duration-300"`,
            `className="md:grid md:grid-cols-2 md:gap-6"`,
            `className="print:hidden hidden sm:block"`,
            `className="leading-relaxed text-lg"`,
            `className="overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400"`,
        ],
    },
};

const data = {
    Javascript: javascript,
    HTML: html,
    CSS: css,
    React: react,
};

export default data;
