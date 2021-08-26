import React from 'react';
import { useSelector } from 'react-redux';
import MenuItem from '../menu-item/menu-item.component';
import { selectDirectorySections } from '../../redux/directory/directory.selector';

const Directory = () => {

    const sections = useSelector(selectDirectorySections)

    return (
        <div className="directory-menu">
            {sections.map(({ id, ...otherSectionsProps }) => (
                <MenuItem key={id} {...otherSectionsProps} />
            ))}
        </div>
    )
};



export default Directory;
