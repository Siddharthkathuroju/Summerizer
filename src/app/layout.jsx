import React from 'react';
import '../../styles/globals.css';

export const metadata = {
    title: "Mr.Summerizer",
    description: "Quick Read Stop",
  };
const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
          {children}
        </main>
      </body>
    </html>
  )
}

export default layout;
