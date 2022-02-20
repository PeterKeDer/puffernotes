import zero from '../img/0.png';
import one from '../img/1.png';
import two from '../img/2.png';
import three from '../img/3.png';
import four from '../img/4.png';
import './Puffer.scss';

const Puffer = () => {
    return (
        <div className="Animation">
            <div className="Animation-frames">
                <div className="Animation-frame">
                    <img className="frame" src={zero} alt="zero"/>
                </div>
                <div className="Animation-frame">
                    <img className="frame" src={one} alt="one"/>
                </div>
                <div className="Animation-frame">
                    <img className="frame" src={two} alt="two"/>
                </div>
                <div className="Animation-frame">
                    <img className="frame" src={three} alt="three"/>
                </div>
                <div className="Animation-frame">
                    <img className="frame" src={four} alt="four"/>
                </div>
            </div>
        </div>
    );
}

export default Puffer;