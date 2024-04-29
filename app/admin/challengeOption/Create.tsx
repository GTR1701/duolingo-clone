import {
	BooleanInput,
	Create,
	NumberInput,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	TextInput,
	required,
} from "react-admin";

const ChallengeOptionCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<BooleanInput source="correct" validate={[required()]} label="correct"/>
				<ReferenceInput source="challengeId" reference="challenges" />
				<TextInput source="imageSrc" validate={[required()]} label="imageSrc" />
				<TextInput source="audioSrc" validate={[required()]} label="audioSrc" />
			</SimpleForm>
		</Create>
	);
};

export default ChallengeOptionCreate;
