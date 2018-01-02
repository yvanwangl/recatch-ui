import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

const fields = [{
    name: 'name',
    label: 'Nick Name',
    rules: 'required|string|between:1,25'
}, {
    name: 'commentContent',
    label: 'Comment Content',
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

const options = {
    showErrorsOnClear: false,
    showErrorsOnReset: false
};

const commentFormConstructor = () => new MobxReactForm({ fields }, { plugins, hooks, options });

export default commentFormConstructor;
