import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

const rules = {
    webset: {
        function: (value) => value.match(/^http(s)?:\/\/([\w]+.){1,2}(com|cn|org|edu|gov|net|tech|pub)$/),
        message: 'The web address is invalid. Eg: https://example.com or http://example.com',
    },
};

const plugins = {
    dvr: {
        package: validatorjs,
        extend: ($validator) => {
            // here we can access the `validatorjs` instance and we
            // can add the rules using the `register()` method.
            Object.keys(rules).forEach((key) =>
                $validator.register(key, rules[key].function, rules[key].message));
        }
    },
};

const fields = [{
    name: 'name',
    label: 'Web Name',
    rules: 'required|string|between:1,25'
}, {
    name: 'link',
    label: 'Web Address',
    rules: 'required|string|webset|between:1,50',
}, {
    name: 'email',
    label: 'Email',
    rules: 'required|string|email|between:1,50',
}, {
    name: 'description',
    label: 'Web Description',
    rules: 'required|string|between:1,200',
}];

const hooks = {
    onSuccess(form) {
        alert('Form is valid! Send the request here.');
        // get field values
        console.log('Form Values!', form.values());
    },
    onError(form) {
        alert('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
    }
}

export default new MobxReactForm({ fields }, { plugins, hooks });