import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Button, Modal, ModalHeader, ModalBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;


  class CommentForm extends Component {
      constructor(props) {
          super(props);
          this.state = {
              isModalOpen: false,
         };

          this.toggleModal = this.toggleModal.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
         }
        
         toggleModal() {
            this.setState({ 
                isModalOpen: !this.state.isModalOpen
             });
        }

        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(
                this.props.campsiteId, 
                values.rating, 
                values.author, 
                values.text
            );
        }

    render() {
       
        return (
            <React.Fragment>
              
                <Button outline onClick={this.toggleModal}>
                  <i className="fa fa-pencil fa-lg" />
                       Submit Comment
                </Button>
              
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.handleSubmit}>
                            
                            <div className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <Control.select
                                    model= ".rating"
                                    id="rating"
                                    name="rating"
                                    className="form-control" 
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Your Name</label>
                                <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    className="form-control"
                                    placeholder="author" 
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15),
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: "Must be at least 2 characters",
                                        maxLength: "Must be 15 characters or less",
                                    }}
                                />
                                  
                              </div>
                              <div className="form-group">
                                  <label htmlFor="comment">Comment</label>
                                  <Control.textarea
                                    model=".text"
                                    id="text"
                                    name="text"
                                    className="form-control"
                                    placeholder="Comment"
                                    rows="6"
                                    />
                                  
                              </div>
                              <button>Submit Comment</button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                
            </React.Fragment>
            );
        }
        
  }
    
    function RenderCampsite({ campsite }) {
            return (
                 <div className="col-md-5 m-1">
                        <Card>
                            <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                            <CardBody>
                                
                                <CardText>{campsite.description}</CardText>
                            </CardBody>
                        </Card>
                </div>
        );
    }
    
    function RenderComments({ comments, addComment, campsiteId }) {
            if (comments) {
                return (
                    <div className="col-md-5 m-1">
                         <h4>Comments:</h4>
                        {comments.map(comment => {
                          return (
                              <div key={comments.id}>
                                <p>{comment.text}</p><br />
                                {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                              </div>);
                        })}
                            
                             <CommentForm campsiteId={campsiteId} addComment={addComment} /> 
                        </div>
                );
            }
             return <div />
        }
        
        function CampsiteInfo(props) {
            if (props.isLoading) {
                return (
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                );
            };

            if (props.errMess) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h4>{props.errMess}</h4>
                            </div>
                        </div>
                    </div>
                );
            }
            if (props.campsite) {
                return (
                    <div className="container">
                        <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                        <div className="row">
                            <RenderCampsite campsite={props.campsite} />
                            <RenderComments
                                campsiteId={props.campsite.id} 
                                addComment={props.addComment}
                                comments={props.comments} 
                               
                         />
                             
                        </div>
             </div>
         );
    }

    return <div />
 }
            
            export default CampsiteInfo;
