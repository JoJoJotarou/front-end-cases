const axios = require('axios');


function split_path(path) {
    let path_arr = path.split("/")
    let len = path.split("/").length
    let res_arr = path_arr.slice(len - 2, len)
    return res_arr.join('/')
}

function unit(number) {
    let _number = number / 1000;
    if (_number >= 1000) {
        return parseFloat((_number / 1000).toFixed(1)) + 'm'
    } else if (_number >= 1) {
        return parseFloat(_number.toFixed(1)) + 'k'
    } else {
        return number;
    }
}

const github = {
    repo: (path) => {
        return new Promise((resolve, reject) => {
            let options = {
                url: 'https://api.github.com/repos/' + split_path(path),
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/91.0.4472.114',
                    'Content-Type': 'application/json',
                    'accept': 'application/vnd.github.v3+json',
                }
            };

            axios(options).then(response => {
                resolve(response)
            }).catch(error => {
                resolve({ 'status': error.response.status })
            })
        })
    }
}

async function test() {
    resp = await github.repo('https://github.com/JoJoJotarou/hexo-github-repo-tag')
    if (resp.status = 200) {
        let data = resp.data;
        console.log(data.owner.avatar_url)
        console.log(data.full_name)
        console.log(data.description)
        console.log(data.language)
        console.log(unit(data.stargazers_count))
        console.log(data.html_url)    
    } else {
        console.log(resp.status)
    }
}


test()
