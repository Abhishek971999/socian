import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
      sort: "created",
      direction: "desc",
      repos: [],
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, direction } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&direction=${direction}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { repos } = this.state;
    const repoItems =
      repos &&
      repos instanceof Array &&
      repos.map((repo) => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge bg-info me-2">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge bg-secondary me-2">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge bg-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));
    return (
      <div ref="myRef">
        {repos instanceof Array && (
          <>
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            {repoItems}
          </>
        )}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
