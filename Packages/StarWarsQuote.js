import './index.css';

const StarWarsQuote = ({ query, data, packageKey }) => {
  return `
    <div class="mainCol">
      <h1>"${data}"</h1>
    </div>
  `;
};

export default StarWarsQuote;
