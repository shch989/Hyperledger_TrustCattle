import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import CattleDetailPage from '../../pages/cattle/CattleDetailPage';

const PortalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const CattleDetailPortal = (props) => {
  const portalRoot = document.getElementById('portal-root');

  if (!portalRoot) {
    console.error('portal-root not found in the document.');
    return null;
  }

  return ReactDOM.createPortal(
    <PortalOverlay>
      <CattleDetailPage cattle={props.cattle} onClose={props.onClose} />
    </PortalOverlay>,
    portalRoot
  );
};

export default CattleDetailPortal;