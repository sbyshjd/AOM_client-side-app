import React, { Component } from 'react';
import Timeline, {
    TimelineHeaders,
    SidebarHeader,
    DateHeader
  } from "react-calendar-timeline/lib";
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]
 
const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]

// const keys = {
//     groupIdKey: "id",
//     groupTitleKey: "title",
//     groupRightTitleKey: "rightTitle",
//     itemIdKey: "id",
//     itemTitleKey: "title",
//     itemDivTitleKey: "title",
//     itemGroupKey: "group",
//     itemTimeStartKey: "start",
//     itemTimeEndKey: "end",
//     groupLabelKey: "title"
//   };

class Planing extends Component {
    constructor(props) {
        super(props);
        this.state={
            groups: groups,
            items: items,
        }

    }

    convertProjectsToGroups =(projects) => {
        // const groups = projects.map(p=>{
        //     return {id:p._id,title:'Project: '+p.projectcode}
        // })
        // return groups
        const groups = projects.reduce((aR,cP) => {
            return aR.concat({id:cP._id,title:'Project: '+cP.projectcode},
                        cP.team.map(u => {
                return {id:u._id+cP._id,title:u.username}
            }))
        },[0])
        console.log(groups)
        return groups
    }

    convertProjectsToItems=(projects) => {
        // const groups = this.convertProjectsToGroups(projects)
        const items = projects.reduce((aR,cP) => {
            return aR.concat(
                {id:cP._id, group:cP._id, title:cP.projectname, start_time:moment(cP.startdate), end_time:moment(cP.enddate)},
                cP.team.map(u => {
                    const task = this.props.tasks.find(t=> t.project._id===cP._id&&t.user._id===u._id)
                    if(!task) {
                        return {};
                    }
                    return {id:u._id+cP._id, group:u._id+cP._id, title:task.taskname, start_time:moment(task.startdate), end_time:moment(task.enddate)  }
                })
                )
        },[0])
        console.log(items)
        return items
    }

    render() {
        return (
            <Timeline
                    groups={this.convertProjectsToGroups(this.props.projects)}
                    items={this.convertProjectsToItems(this.props.projects)}
                    // keys={keys}
                    showCursorLine
                    canResize={false}
                    canMove={false}
                    defaultTimeStart={moment().add(-12, 'hour')}
                    defaultTimeEnd={moment().add(12, 'hour')}
                >
                <TimelineHeaders className="sticky">
                <SidebarHeader>
                    {({ getRootProps }) => {
                        return <div {...getRootProps()}>Left</div>;
                        }}
                </SidebarHeader>
                <DateHeader unit="primaryHeader" />
                <DateHeader />
                </TimelineHeaders>
            </Timeline>
        );
    }
}

export default Planing;