const greeting = () => {
    const date = new Date();
    const hours = date.getHours();
    let greeting = '';
    if(hours >= 16) {
        greeting = 'Good Evening!';
    } else if(hours >= 12) {
        greeting = 'Good Afternoon!';
    } else if(hours >= 3) {
        greeting = 'Good Morning!';
    } else {
        greeting = 'Time to Sleep!';
    }
    document.querySelector('.greeting-container .greeting').textContent = greeting;
}

const timer = () => {
    const el = document.querySelector('.timer-container .timer');
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    setInterval(() => {
        const date = new Date();
        const timeString = date.toLocaleString('en-US', options);
        el.textContent = timeString;
    }, 1000);
}

const defaultSetting = () => {
    fetch('./data/default.json').then((res) => {
        if(!res.ok) {
            return;
        }
        res.json().then((data) => {
            const links = data.links;
            const ul = document.createElement('ul');
            ul.className = 'links-wrapper';
            links.forEach((link) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                const span = document.createElement('span');
                const img = document.createElement('img');
                a.href = link.href;
                span.textContent = link.name;
                img.src = link.image;
                img.alt = link.name;
                li.className = 'link-item';
                a.append(img);
                a.append(span);
                li.append(a);
                ul.append(li);
            });
            document.querySelector('.links-container').append(ul);
        });
    });
}

const initSearchbar = () => {
    const searchbar = document.querySelector('.search-container');
    const obj = JSON.parse(localStorage.getItem('browser-dashboard-search') || '{}');
    const searchTerms = obj.searchTerms || [];
    searchbar.querySelector('.search-text').addEventListener('input', (e) => {
        const suggestions = [];
        const text = e.target.value
        const suggestionsEl = document.querySelector('.search-suggestions');
        if(text) {
            searchTerms.forEach((item) => {
                if(suggestions.length > 5) {
                    return;
                }
                if(item.toUpperCase().startsWith(text.toUpperCase())) {
                    suggestions.push(item);
                }
            });
        }
        if(suggestions.length > 0) {
            const ul = document.createElement('ul');
            suggestions.forEach((item) => {
                const li = document.createElement('li');
                const span = document.createElement('span');
                span.textContent = item;
                li.append(span);
                ul.append(li);
            });
            suggestionsEl.innerHTML = ul.outerHTML;
            searchbar.querySelectorAll('.search-suggestions').forEach((item) => {
                item.addEventListener('click', (e) => {
                    searchbar.querySelector('.search-text').value = e.target.textContent;
                    suggestionsEl.innerHTML = '';
                });
            });
        } else {
            suggestionsEl.innerHTML = '';
        }
    });
    searchbar.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = e.target.querySelector('[name=text]').value;
        if(text) {
            searchTerms.push(text);
            obj.searchTerms = searchTerms;
            localStorage.setItem('browser-dashboard-search', JSON.stringify(obj));
            window.location.href = `https://google.com/search?q=${text}`;
        }
    });
}

const init = () => {
    greeting();
    timer();
    defaultSetting();
    initSearchbar();
}

init();

