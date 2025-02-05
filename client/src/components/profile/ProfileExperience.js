import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({experience : {company,title,location,current,to,from,description}}) => 
    <div>
        <h3 className='text-dark'>{company}</h3>
        <p>
            <Moment format='YYY/MM/DD'>{from}</Moment> - {!to ? ' Now' :<Moment format='YYYT/MM/DD'>{to}</Moment>}
        </p>
        <p>
            <strong>Position: </strong>{title}
        </p>
        <p>
            <strong>Desciption: </strong>{description}
        </p>
    </div>
;

ProfileExperience.propTypes = {
experience : PropTypes.object.isRequired
}

export default ProfileExperience