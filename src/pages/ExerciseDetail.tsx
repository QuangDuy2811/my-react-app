import { useParams } from 'react-router-dom';

const ExerciseDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold">Exercise Detail</h2>
      <p>Showing details for exercise ID: {id}</p>
    </div>
  );
};

export default ExerciseDetail;
