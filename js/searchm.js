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
        let img = document.createElement("img");
        let dvI = document.createElement("div");
        img.src = review.multimedia.src;
        img.classList.add("d-block")
        img.classList.add("w-100");
        dvI.classList.add('carousel-item');
        dvI.appendChild(img);
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
                $('.alert').hide();
                to3 = (word!="") ? false: true;
                handleResponse(responseSearch.results);
            } else {
                window.location.href = "search.html";
            }
        }
    }
});