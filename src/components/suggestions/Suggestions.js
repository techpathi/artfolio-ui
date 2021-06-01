import { Link } from "react-router-dom";
import './suggestions.css';
import avatar1 from '../../assets/female.gif'
import avatar2 from '../../assets/male.gif'

const colors = ['#FFBF00', '#FF7F50', '#DE3163', '#6495ED', '#40E0D0'];

const avatars = [avatar1, avatar2];

const saveSelectedVendor = (function () {

})();

const Suggestions = (props) => {
    const options = props.results.map(
        r => (
            <div class="chip" style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }} >
                <Link to={{ pathname: `/profile/${r.artistType}/${r.cityName}/${r.pageUrl}`, vendorId: `${r.vendorId}` }} onClick={(function () { localStorage.setItem('currentVendorId', r.vendorId )})()} >
                    <img src={avatars[Math.floor(Math.random() * avatars.length)]} alt="Person" width="96" height="96" />
                    {r.name}
                </Link>
            </div >
        ));
    return <ul>{options}</ul>
}

export default Suggestions;