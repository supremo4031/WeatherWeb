
const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');

const dataHide = document.querySelector('.middle_layer');

// api.openweathermap.org/data/2.5/weather?q=kolkata&appid=e72d88eb0208953a86e8b4b44591b50b

const getInfo = async (event) => {
    event.preventDefault();

    let cityVal = cityName.value;
    console.log(cityVal);
    if(cityVal === "") {
        city_name.innerText = "Please write a city name before search";
        dataHide.classList.add('data_hide');
    } else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=e72d88eb0208953a86e8b4b44591b50b`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;

            let tempMood = arrData[0].weather[0].main;

            // conditions to check sunny or cloudy
            if(tempMood == 'Clear') {
                temp_status.innerHTML = "<i class='fa fa-sun' style='color: #eccc68;'></i>"
            } else if(tempMood == 'Clouds') {
                temp_status.innerHTML = "<i class='fa fa-cloud' style='color: #f1f2f6;'></i>"
            } else if(tempMood == 'Rain') {
                temp_status.innerHTML = "<i class='fa fa-cloud-rain' style='color: #a4b0be;'></i>"
            } else {
                temp_status.innerHTML = "<i class='fa fa-sun' style='color: #eccc68;'></i>"
            }

            dataHide.classList.remove('data_hide');
        })
        .catch(err => {
            city_name.innerText = err;
            dataHide.classList.add('data_hide');
        });
    }
}

submitBtn.addEventListener('click', getInfo);