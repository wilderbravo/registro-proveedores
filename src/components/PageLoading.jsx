import React from 'react';
import './styles/PageLoading.css';
import Loader from './Loader';

function PageLoading () {
    return (
        <div className="PageLoading">
            <Loader />  
            <p>Cargando...</p>  
        </div>
    )
}

export default PageLoading;