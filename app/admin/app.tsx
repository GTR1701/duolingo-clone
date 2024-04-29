"use client";

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import CourseList from "./course/List";
import CourseCreate from "./course/Create";
import CourseEdit from "./course/Edit";
import UnitList from "./unit/List";
import UnitCreate from "./unit/Create";
import UnitEdit from "./unit/Edit";
import LessonList from "./lesson/List";
import LessonCreate from "./lesson/Create";
import LessonEdit from "./lesson/Edit";
import ChallengeList from "./challenge/List";
import ChallengeCreate from "./challenge/Create";
import ChallengeEdit from "./challenge/Edit";
import ChallengeOptionList from "./challengeOption/List";
import ChallengeOptionCreate from "./challengeOption/Create";
import ChallengeOptionEdit from "./challengeOption/Edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource
				name="courses"
				recordRepresentation="title"
				list={CourseList}
                create={CourseCreate}
                edit={CourseEdit}
			/>
			<Resource
				name="units"
				recordRepresentation="title"
				list={UnitList}
                create={UnitCreate}
                edit={UnitEdit}
			/>
			<Resource
				name="lessons"
				recordRepresentation="title"
				list={LessonList}
                create={LessonCreate}
                edit={LessonEdit}
			/>
			<Resource
				name="challenges"
				recordRepresentation="title"
				list={ChallengeList}
                create={ChallengeCreate}
                edit={ChallengeEdit}
			/>
			<Resource
				name="challengeOptions"
				recordRepresentation="title"
				list={ChallengeOptionList}
                create={ChallengeOptionCreate}
                edit={ChallengeOptionEdit}
				options={{ label: "Challenge Options"}}
			/>
		</Admin>
	);
};

export default App;
