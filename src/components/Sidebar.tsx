import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Lesson from './Lesson';

const GET_LESSONS_QUERY = gql`
   query MyQuery {
      lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
         id
         lessonType
         title
         slug
         availableAt
      }
   }
`

interface GetLessonsQueryResponse {
   lessons: {
      id: number,
      lessonType: 'class' | 'live',
      title: string,
      slug: string,
      availableAt: string
   }[]
}

const Sidebar: React.FC = () => {
   const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);
   // console.log(data);

   return (
      <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600    ">
         <span className='font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block'>
            Cronograma de aulas
         </span>

         <div className='flex flex-col gap-8'>
            {data?.lessons.map(lesson => (
               <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  slug={lesson.slug}
                  availableAt={new Date(lesson.availableAt)}
                  type={lesson.lessonType}
               />
            ))}
         </div>
      </aside>
   );
}

export default Sidebar;