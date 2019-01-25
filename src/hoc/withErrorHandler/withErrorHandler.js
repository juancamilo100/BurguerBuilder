import React, {Fragment, Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
// import withErrorHandler from '../../containers/BurgerBuilder/BurgerBuilder';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });

                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Fragment>
                    <h1>{this.props.testProp}</h1>
                    <Modal 
                        show={this.state.error}
                        hide={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
               </Fragment>
            );
        }
    }
}

export default withErrorHandler