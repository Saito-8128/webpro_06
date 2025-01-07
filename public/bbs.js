"use strict";

let number=0;
let post_num = 1;
let row = 0

const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});


document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            if(row==1) {
                bbs.innerHTML = "";
                number = 0;
                post_num = 1;
            }
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    let num_area = document.createElement('span');
                    if(row==0) {
                        num_area.innerText = post_num;
                    } else {
                        num_area.innerText = number-post_num+1;
                    }
                    cover.appendChild( num_area );
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );
                    
                    bbs.appendChild( cover );

                    post_num+=1;
                }
            })
        }
    });
});

document.querySelector('#del').addEventListener('click', () => {
    const bangou = Number(document.querySelector('#bangou').value)-1;
    if( bangou > number ) {
        throw new Error('Error');
    }
    const params = {  // URL Encode
        method: "POST",
        body:  'bangou='+bangou,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/delete";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        bbs.innerHTML = "";
        number = 0;
        post_num = 1;
    });
});

document.querySelector('#put').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    const bangou = Number(document.querySelector('#bangou').value)-1;

    if( bangou > number ) {
        throw new Error('Error');
    }

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message+'&bangou='+bangou,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/put";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
        document.querySelector('#bangou').value = "";
        bbs.innerHTML = "";
        number = 0;
        post_num = 1;
    });
});

document.querySelector('#reverse').addEventListener('click', () => {
    if(row==0){
        row = 1;
    } else {
        row = 0;
    }
    const params = {  // URL Encode
        method: "POST",
        body:  'row='+row,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/reverse";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        bbs.innerHTML = "";
        number = 0;
        post_num = 1;
    });
});