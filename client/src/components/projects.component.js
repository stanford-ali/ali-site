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
    
    this.state = {
      projects: [],
      displayed_projects: [],
      search: '',
      categories: [],
      query_categories: [],
      tags: [],
      query_tags: [],
      sort: [],
    }
  }

  componentDidMount() {
    // get projects, categories, and tags
    const projectRequest = axios.get('http://localhost:5000/projects');
    const categoryRequest = axios.get('http://localhost:5000/categories');
    const tagRequest = axios.get('http://localhost:5000/tags');

    axios.all([projectRequest, categoryRequest, tagRequest])
      .then(axios.spread((...res) => {
        const projectResponse = res[0];
        const categoryResponse = res[1];
        const tagResponse = res[2];

        this.setState({
          projects: projectResponse.data,
          categories: categoryResponse.data,
          tags: tagResponse.data
        }, () => {
          this.setDisplayedProjects(); // do this here (asynchronous method) so it only runs when res.data is loaded
        });
      }))
      .catch(errors => {
        console.log(errors);
      })
      
    if (this.props.location.search) {
      let params = qs.parse(this.props.location.search.substring(1), {
        encode: false,
        indices: false
      });

      this.setState({
        search: params.search ? params.search : [],
        categories: params.category ? params.category : [],
        tags: params.tag ? params.tag : []
      }, () => {
        this.setDisplayedProjects();
      })
    }
  }

  onSearchChange(event) {
    this.setState({
      search: event.target.value
    }, () => {
      this.setDisplayedProjects();
      this.setQueryString();
    })
  } 

  onCategoryFilterChange() {
    this.setState({
      query_categories: []
    }, () => {
      this.setDisplayedProjects();
      this.setQueryString();
    })
  }
  
  onTagFilterChange(event) {
    this.setState({
      query_tags: []
    }, () => {
      this.setDisplayedProjects();
      this.setQueryString();
    })
  }

  onSortChange(event) {
    if (this.target.event === '' || this.target.event === 'Alphabetical') {
      return this.sortByAlphabet;
    }
    return this.sortByTime;
  }

  sortByAlphabet = (a, b) => {
    return a.title < b.title ? -1 : 1;
  }
  sortByTime = (a, b) => {
    return a.createdAt < b.created_at ? -1 : 1;
  }
  sortByRelevance = (a, b) => {
    // use two values: a_value and b_value
    // keyword = this.state.search (should be updated by function call in render())
    // ^ --> this.sortByRelevance = this.sortByRelevance.bind(this), or pass keyword as parameter?
    // keyword in title: value += 3 points
    // keyword in tag: value += 2 points
    // keyword in description: value += 1 point
    // compare sum of values
    // ???: faculty? department?  
  }

  setQueryString() {
    let query_string = qs.stringify({
      search: this.state.search !== '' ? this.state.search : [], 
      categories: this.state.query_categories,
      tags: this.state.query_tags
    }, {
      encode: false,
      indices: false
    })
    if (query_string !== '') {
      query_string = '?' + query_string;
    }
    // change url without reloading or pushing to browser history
    window.history.replaceState({}, '', `/projects/${query_string}`);
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
  
  filterByTag() {
    if (this.state.tags.length > 0) {
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
            <i className='fa fa-search icon'></i>
            <label>Search Projects:</label>
            <input type='text' className='search-bar' onChange={this.onSearchChange}/>
          </div>
          {/* last step: add sort before call to map, associate with button in filter */ }
          {this.state.displayed_projects.map(project => (
            <div className='project' key={project._id}>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
}