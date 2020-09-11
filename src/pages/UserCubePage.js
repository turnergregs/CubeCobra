import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import CubePreview from 'components/CubePreview';
import UserLayout from 'layouts/UserLayout';
import DynamicFlash from 'components/DynamicFlash';
import Advertisement from 'components/Advertisement';
import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';

const UserCubePage = ({ user, owner, followers, following, cubes, loginCallback }) => (
  <MainLayout loginCallback={loginCallback} user={user}>
    <UserLayout
      user={owner}
      followers={followers}
      following={following}
      canEdit={user && user.id === owner._id}
      activeLink="view"
    >
      <Advertisement />
      <DynamicFlash />
      <Card>
        <CardHeader>
          <h5 className="mb-0">About</h5>
        </CardHeader>
        <CardBody>
          <Row className="mb-3">
            {owner.image && (
              <Col xs={4} lg={3}>
                <div className="position-relative">
                  <img width="100%" className="border" src={owner.image} alt={owner.image_name} />
                  <em className="cube-preview-artist">Art by {owner.artist}</em>
                </div>
              </Col>
            )}
            <Col xs={owner.image ? 8 : 12} lg={owner.image ? 9 : 12}>
              {owner.about ? (
                owner.about
                  .trim()
                  .split(/[\r\n]+/)
                  .map((para, index) => (
                    <p key={/* eslint-disable-line react/no-array-index-key */ index} className="my-0">
                      {para}
                    </p>
                  ))
              ) : (
                <em>This user has not yet filled out their about section.</em>
              )}
            </Col>
          </Row>
          {user && user.id === owner._id && (
            <Button color="success" block outline href="/user/account">
              Update
            </Button>
          )}
        </CardBody>
      </Card>
      <Row className="my-3">
        {cubes.map((cube) => (
          <Col key={cube._id} className="mt-3" xs={6} sm={4} md={3}>
            <CubePreview cube={cube} />
          </Col>
        ))}
      </Row>
    </UserLayout>
  </MainLayout>
);

UserCubePage.propTypes = {
  owner: PropTypes.shape({
    about: PropTypes.string.isRequired,
    image_name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }),
  followers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  following: PropTypes.bool.isRequired,
  cubes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loginCallback: PropTypes.string,
};

UserCubePage.defaultProps = {
  user: null,
  loginCallback: '/',
};

export default RenderToRoot(UserCubePage);