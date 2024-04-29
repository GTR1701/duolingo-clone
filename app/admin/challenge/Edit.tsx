import {
	Edit,
	NumberInput,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	TextInput,
	required,
} from "react-admin";

const ChallengeEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput
					source="question"
					validate={[required()]}
					label="question"
				/>
				<ReferenceInput source="lessonId" reference="lessons" />
				<SelectInput
					source="type"
					choices={[
						{ id: "SELECT", name: "SELECT" },
						{ id: "ASSIST", name: "ASSIST" },
					]}
				/>
				<NumberInput
					source="order"
					validate={[required()]}
					label="order"
				/>
			</SimpleForm>
		</Edit>
	);
};

export default ChallengeEdit;
