import React from 'react';
import PropTypes from 'prop-types';

const Infobox = ({image, content, buttonText}) => {
    return (
        <aside className="card story-supplement infobox pull-left pull-left-narrow pushdown">
            <div className="story-supplement-content">
                {image && <img className="infobox__img" src={image.imageVariations.original.url} alt="" />}
                <div className="sidebar-infobox">
                    <div dangerouslySetInnerHTML={{__html: content}}></div>
                    <p></p>
                    <p className="text-center">
                        {buttonText && (
                            <a href="#" className="btn btn-primary" data-toggle="modal" data-target="#popup-0">
                                {buttonText}
                            </a>
                        )}
                    </p>
                </div>
            </div>

            <div className="modal fade" id="popup-0" tabIndex="-1" role="dialog" aria-labelledby="modalTitle-0">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h3 className="modal-title" id="modalTitle-0">
                                Related stories
                            </h3>
                        </div>
                        <div className="modal-body" id="modalText-0">
                            <ul className="post-list">
                                <li>
                                    <a href="https://news.stanford.edu/2021/03/26/qa-environmental-policies-americans/">Q&amp;A: Environmental policies for all Americans?</a>
                                </li>
                                <li>
                                    <a href="https://news.stanford.edu/2021/03/24/biden-can-jumpstart-u-s-nuclear-waste-strategy/">
                                        How Biden can jumpstart U.S. nuclear waste strategy
                                    </a>
                                </li>
                                <li>
                                    <a href="https://news.stanford.edu/2021/03/23/making-america-green/">Making America green again</a>
                                </li>
                                <li>
                                    <a href="https://news.stanford.edu/2021/03/23/wildfire-solutions/">Wildfire solutions</a>
                                </li>
                                <li>
                                    <a href="https://news.stanford.edu/2021/03/23/research-policy-changing-arctic/">Research and policy in a changing Arctic</a>
                                </li>
                                <li>
                                    <a href="https://news.stanford.edu/2021/03/23/future-americas-drinking-water/">The future of America’s drinking water</a>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" id="modalButton-0">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Infobox;

Infobox.propTypes = {
    image: PropTypes.object,
    content: PropTypes.string,
    buttonText: PropTypes.string,
};
