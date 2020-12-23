import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Col from "react-bootstrap/Col"

import LabelMenus from "../LabelMenus/index"
import ShareButton from "../ShareButton/index"
import DatasetInfo from "../_Labels_/DatasetInfo/index"
import Overview from "../_Labels_/Overview/index"
import Objectives from "../_Labels_/Objectives/index"
import { fetchLabelThunk } from "../../store/labelStore"

import styles from "./styles.module.css"

class LabelWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log("label", this.props.label)
    return (
      <div key={0} className={styles.labelWrapper}>
        {this.props.label.overview === undefined ? (
          []
        ) : (
          <div key={1}>
            <div className={styles.flexTitleMenus}>
              <LabelMenus />
            </div>
            <Col
              className={styles.sectionBase}
              xl={{ span: 8, offset: 3 }}
              md={{ span: 8, offset: 3 }}
              sm={{ span: 12 }}
            >
              <div className={styles.labelHeader}>
                <h1>Dataset Nutrition Label</h1>
                <div>
                  <h4>{this.props.label.overview.summary.datasetName}</h4>
                  <p>{this.props.label.overview.summary.createdBy}</p>
                </div>
                <ShareButton />
              </div>
              {this.props.base === "OVERVIEW" ? (
                <Overview
                  summary={this.props.label.overview.summary}
                  datasetInfoDescription={
                    this.props.label["dataset-info"].description
                  }
                  topUseCases={this.props.label.overview["use-cases"]}
                  useCasesSection={this.props.label["objectives-section"]}
                />
              ) : this.props.base === "OBJECTIVES/ALERTS" ? (
                <Objectives
                  objectives={this.props.label["objectives-section"]}
                />
              ) : this.props.base === "DATASET INFO" ? (
                <DatasetInfo datasetInfo={this.props.label["dataset-info"]} />
              ) : (
                []
              )}
            </Col>
          </div>
        )}
      </div>
    )
  }
}

LabelWrapper.propTypes = {
  base: PropTypes.string.isRequired,
  jsonFile: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    label: state.label,
    data: state.data,
    base: state.base,
    overview: state.overview,
    usecases: state.usecases,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLabel: dispatch(fetchLabelThunk(ownProps.jsonFile)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelWrapper)
