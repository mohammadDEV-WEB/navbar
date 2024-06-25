import React from 'react';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Switch from './Switch';
import File from './File';
import MultipleSelect from './MultipleSelect';
import SearchOneSelect from './searchOneSelect';
import SearchMultipleSelect from './SearchMultipleSelect';
import CkEditor from './CKEditor';

const FormikControl = (props) => {
    switch (props.control) {
        case "select":
            return <Select {...props} />
        case "multipleSelect":
            return <MultipleSelect {...props} />
        case "searchMultipleSelect":
            return <SearchMultipleSelect {...props} />
        case "searchOneSelect":
            return <SearchOneSelect {...props} />
        case "input":
            return <Input {...props} />
        case "textarea":
            return <Textarea {...props} />
        case "file":
            return <File {...props} />
        case "switch":
            return <Switch {...props} />
        case "CKEditor":
            return <CkEditor {...props} />
    }
}

export default FormikControl;
