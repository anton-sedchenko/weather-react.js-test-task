export const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getUserAddress, handleLocationError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

const handleLocationError = (error) => {
    if (error.POSITION_UNAVAILABLE) {
        console.log('An unknown error occured when geolocation initialized');
    }
}

const getUserAddress = (position) => {
    const GOOGLE_MAP_API_KEY = 'AIzaSyCnkUdY8A3sUaVs7szIibwFEP-EBZJ_WJw';
    const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&language=en&key=${GOOGLE_MAP_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const userCity = data.results[0].address_components[3].long_name;

            localStorage.setItem('userCityLocation', userCity);
        })
        .catch(error => console.log(error))
}
