import { observable, action, runInAction } from 'mobx';
import request from '../../utils/request';

class CommentStore {
    @observable comments
}
