import React from 'react';
import FirstComponent from './FirstComponent';
import FourthComponent from './FourthComponent';
import LearningJavaScript from './LearningJavaScript';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';

const LearningComponent = () => {
    return (
        <div className="App">
           <FirstComponent/>
           <SecondComponent/>
           <ThirdComponent/>
           <FourthComponent/>
           <LearningJavaScript/>
        </div>
    );
};

export default LearningComponent;
