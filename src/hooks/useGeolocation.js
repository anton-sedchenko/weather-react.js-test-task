import React, { useEffect, useState } from 'react';

const useGeolocation = () => {
    const [location, setLocation] = useState({
        isLoaded: false,
        lat: '',
        lng: ''
    });

    const onSuccess = (location) => {
        setLocation({
            isLoaded: true,
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    };

    const onError = (error) => {
        if (error.POSITION_UNAVAILABLE) {
            console.log('An unknown error occured when geolocation initialized');
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }, [])

    return location;
};

export default useGeolocation;
