$(document).ready(function () {
    const API_KEY = "ncuS9N5U0mhGGHKOHuZGEl6qoE2ehoPw";
    let nyt_url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
    let result = null;
    let dvReviews = document.getElementById('card');
    let noSlider = 3;
    let response = null;
    let btnSearch = document.getElementById('btnSearch');
    let txtSearch = document.getElementById('txtSearch');
    let to3 = true;


    let xmlRequest = new XMLHttpRequest();
    let url = new URL(nyt_url);
    url.searchParams.set('api-key', API_KEY);

    xmlRequest.open('GET', url);
    xmlRequest.responseType = 'json';
    xmlRequest.send();
    xmlRequest.onload = function () {
        response = xmlRequest.response;
        if(response.num_results>0)
            handleResponse(response.results);
        else
            window.location.href="search.html";
    }
    xmlRequest.onerror = function () {
        window.location.href="search.html?error=true";
    };
    btnSearch.addEventListener('click', e => {
        e.preventDefault();
        let srcWord = txtSearch.value;
        searchCriteria(srcWord);
        return false;
    });

    function handleResponse(response) {
        response.forEach(review => {
            if (noSlider > 0 && to3) {
                let itemSlider = createSliderItem(review);
                if (noSlider == 3) {
                    itemSlider.classList.add("active");
                }
                let sl = document.getElementById("slContainer");
                sl.appendChild(itemSlider);
                noSlider--;
            } else {
                let card = createCard(review);
                let col = document.createElement('div');
                col.classList.add('col');
                col.appendChild(card);
                dvReviews.appendChild(col);
            }
        });
    }

    function createCard(review) {
        let img = document.createElement("img");
        img.src = review.multimedia.src;
        img.classList.add("card-img-top");

        let dv1 = document.createElement('div');
        dv1.appendChild(img);
        dv1.classList.add("card");
        dv1.classList.add("h-100");
        let dvb = document.createElement('div');
        dvb.classList.add("card-body");
        let mH5 = document.createElement('h5');
        let mPB = document.createElement('p');
        let mAG = document.createElement('a');
        mH5.textContent = review.display_title;
        mH5.classList.add("ard-title");
        mPB.textContent = review.summary_short;
        mPB.classList.add("card-text");
        mAG.href = review.link.url;
        mAG.target = "blank";
        mAG.classList.add("btn");
        mAG.classList.add("btn-primary");
        mAG.textContent = "Read more...";
        dvb.appendChild(mH5);
        dvb.appendChild(mPB);
        dvb.appendChild(mAG);
        dv1.appendChild(dvb);

        return dv1;
    }
    
    function createSliderItem(review) {
        let ap = document.createElement("p");
        let aImg = document.createElement("a");
        aImg.href = review.link.url;
        aImg.title = "Ver Review "+review.display_title;
        aImg.textContent = review.display_title;
        aImg.target = "blank";
        aImg.classList.add('btn');
        aImg.classList.add('btn-lg');
        aImg.classList.add('btn-primary');
        ap.appendChild(aImg);
        let img = document.createElement("img");
        let dvI = document.createElement("div");
        let dvO = document.createElement("div");
        img.src = review.multimedia.src;
        dvO.classList.add('carousel-caption');
        dvO.classList.add('text-start');
        dvO.appendChild(ap);
        img.classList.add("d-block")
        img.classList.add("w-100");
        dvI.classList.add('carousel-item');
        dvI.appendChild(img);
        dvI.appendChild(dvO);
        return dvI;
    }

    function searchCriteria(word) {
        let urlSearch = new URL(nyt_url);
        urlSearch.searchParams.set('query', word);
        urlSearch.searchParams.set('api-key', API_KEY);
        let xmlSearchRequest = new XMLHttpRequest();

        xmlSearchRequest.open('GET', urlSearch);
        xmlSearchRequest.responseType = 'json';
        xmlSearchRequest.send();
        xmlSearchRequest.onload = function () {
            let total = xmlSearchRequest.response.num_results;
            let responseSearch = xmlSearchRequest.response;
            if (total > 0) {
                $('#top3Movies').hide();
                $('#card').empty();
                to3 = (word!="") ? false: true;
                handleResponse(responseSearch.results);
            } else {
                window.location.href = "search.html";
            }
        }
    }
});