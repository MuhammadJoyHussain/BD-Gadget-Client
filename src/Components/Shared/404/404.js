import React from 'react';
import styled from 'styled-components';
import svg from '../../../Image/error-404-monochrome.svg'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Forbidden = () => {
    return (
        <Forbid id="layoutError">
            <div id="layoutError_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-6">
                                <div class="text-center mt-4">
                                    <img class="mb-4 img-error" src={svg} />
                                    <p class="lead">This requested URL was not found on this server.</p>
                                    <Link to="/home" className="btn btn-primary">
                                        <FontAwesomeIcon icon={faHome} />
                                        Return to Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Forbid>
    );
};

export default Forbidden;

const Forbid = styled.div`
#layoutError {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  #layoutError #layoutError_content {
    min-width: 0;
    flex-grow: 1;
  }
  #layoutError #layoutError_footer {
    min-width: 0;
  }

  .img-error {
    max-width: 20rem;
  }

  .lead {
    font-size: 1.25rem;
    font-weight: 300;
  }
`
