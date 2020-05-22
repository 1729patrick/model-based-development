import React from 'react';
import Layout from '../components/layout';

function Route({ component: Component }) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

export default Route;
