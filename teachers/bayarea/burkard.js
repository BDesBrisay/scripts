JSON.stringify(
  new Array(...document.querySelectorAll('.et_pb_team_member')).map((el) => {
    const name = el.querySelector('h4');
    const title = el.querySelector('p');
    const image = el.querySelector('img');

    let ps = new Array(...el.querySelectorAll('div > p')).map(el => el.innerText);
    ps = ps.slice(1).filter(item => item.length < 160).join(', ').replace(/\n/g,' - ');

    return {
      name: name ? name.innerText : '',
      title: title ? title.innerText : '',
        image: image ? image.src : '',
      education: ps,
        school: 'burkard'
    }
  }))