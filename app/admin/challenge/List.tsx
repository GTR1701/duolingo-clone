import {
	Datagrid,
	List,
	NumberField,
	ReferenceField,
	SelectField,
	TextField,
} from "react-admin";

const ChallengeList = () => {
	return (
		<List>
			<Datagrid rowClick="edit">
				<TextField source="id" />
				<ReferenceField source="lessonId" reference="lessons" />
				<SelectField
					source="type"
					choices={[
						{ id: "SELECT", name: "SELECT" },
						{ id: "ASSIST", name: "ASSIST" },
					]}
				/>
				<TextField source="question" />
				<NumberField source="order" />
			</Datagrid>
		</List>
	);
};

export default ChallengeList;
