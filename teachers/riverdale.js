JSON.stringify(
  new Array(...document.querySelectorAll('#post-3485 > div > div.post-list.post-type-archive-facstaff > div > div.grid.grid-4.grid-expanded > article'))
    .map((el) => {
      const res = { school: 'riverdale' };

      const top = el.querySelector('.grid-content-top');
      const name = top.querySelector('h3');
      const title = top.querySelector('p');
      const image = top.querySelector('img');

      const bottom = el.querySelector('.grid-content-bottom');
      const department = bottom.querySelector('span + p');
      const education = bottom.querySelector('.grid-item--degree-list');
      const email = bottom.querySelector('a');

      if (name) res.name = name.innerText;
      if (title) res.title = title.innerText;
      if (image) res.image = image.src;
      if (department) res.department = department.innerText;
      if (education) res.education = education.innerText;
      if (email) res.email = email.href;

      return res;
    })
)