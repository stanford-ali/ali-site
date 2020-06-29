import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onCategoryFilterChange = this.onCategoryFilterChange.bind(this);
    this.onTagFilterChange = this.onTagFilterChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.setQueryString = this.setQueryString.bind(this);
    this.filterBySearch = this.filterBySearch.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
    this.filterByTag = this.filterByTag.bind(this);
    
    // sorts: relevance, date uploaded (low to high, high to low), alphabetical
    this.state = {
      projects: [],
      displayed_projects: [],
      search: '',
      categories: [],
      tags: [],
      sort: [
        'Alphabetical',
        'Uploaded'
      ]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/projects')
      .then(res => {
        if (res.data > 0) {
          this.setState({
            projects: res.data
          })
        }
      }) // maybe find some way to say "no projects founds" in render()
      .catch(error => {
        console.log(error);
      })

    if (this.props.location.search) {
      let params = qs.parse(this.props.location.search.substring(1), {
        encode: false,
        indices: false
      });
      this.setState({
        search: params.search,
        categories: params.category,
        tags: params.tag
      })
      this.setDisplayedProjects();
    }
    // axios: get all tags and categories for filtering on left panel
  }

  onSearchChange(event) {
    this.setState({
      search: event.target.value
    })
    this.setDisplayedProjects();
    this.setQueryString();
  } 

  onCategoryFilterChange() {
    this.setState({
      categories: []
    })
    this.setDisplayedProjects();
    this.setQueryString();
  }
  
  onTagFilterChange(event) {
    this.setState({
      filters: []
    })
    this.setDisplayedProjects();
    this.setQueryString();
  }

  onSortChange(event) {
    if (this.target.event === '' || this.target.event === 'Alphabetical') {
      return this.sortByAlphabet;
    }
    return this.sortByTime;
  }

  // TODO: add sort by relevance...
  sortByAlphabet = (a, b) => {
    return a.name < b.name ? -1 : 1;
  }
  sortByTime = (a, b) => {
    return a.created_at < b.created_at ? -1 : 1;
  }

  setQueryString() {
    let query_string = qs.stringify({
      search: this.state.search, 
      categories: this.state.categories,
      tags: this.state.tags
    }, {
      encode: false,
      indices: false
    })
    if (query_string !== '') {
      query_string = '?' + query_string;
    }
    // change url without reloading or pushing to browser history
    this.context.history.replaceState({}, '', `/projects/${query_string}`);
  }

  setDisplayedProjects() {
    this.filterBySearch();
    this.filterByCategory();
    this.filterByTag();
  }

  filterBySearch() {
    if (this.state.search === '') {
      this.setState({
        displayed_projects: this.state.projects
      })
    } else {
      this.setState({
        displayed_projects: this.state.projects.filter(project => {
          const filter = this.state.search.toLowerCase();
          return project.title.toLowerCase().includes(filter) || project.description.toLowerCase().includes(filter);
        })
      })
    }
  }

  // TODO: figure this out, don't want to send tons of http requests
  filterByCategory() {
    if (this.state.categories.length > 0) {
      // do something
    }
  }

  render() {
    return(
      <section id='projects'>
        <div className='projects-title'>
          <h1>Open Projects</h1>
        </div>
        <div className='projects'>
          <div className='input-icon'>
            <i class='fa fa-search icon'></i>
            <label>Search Projects:</label>
            <input type='text' className='search-bar' onChange={this.onSearchChange}/>
          </div>
          {this.state.displayed_projects.sort(this.onSortChange).map(project => (
            <div className='project'>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
}