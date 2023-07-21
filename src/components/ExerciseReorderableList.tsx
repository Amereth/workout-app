import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCenter,
  type DragEndEvent,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { type Exercise } from '@prisma/client'
import { useFormContext, useWatch } from 'react-hook-form'
import { type WorkoutPlanFormSchema } from '../pages/new-workout-plan'
import { api } from '../utils/api'
import { CSS } from '@dnd-kit/utilities'
import { GripVerticalIcon } from 'lucide-react'

export const ExerciseReorderableList = () => {
  const { data: exercises } = api.exercises.getAll.useQuery()

  const { setValue } = useFormContext<WorkoutPlanFormSchema>()
  const selectedIds = useWatch<WorkoutPlanFormSchema>({
    name: 'exercises',
  }) as Exercise['id'][]

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id) return

    const oldIndex = selectedIds.indexOf(active.id as string)
    const newIndex = selectedIds.indexOf(over?.id as string)

    setValue('exercises', arrayMove(selectedIds, oldIndex, newIndex))
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={selectedIds}
        strategy={verticalListSortingStrategy}
      >
        <ul className='mt-2 flex flex-col gap-y-2'>
          {selectedIds
            .map((id) => exercises?.find((exercise) => exercise.id === id))
            .map(
              (exercise) =>
                exercise && (
                  <SortableItem key={exercise.id} exercise={exercise} />
                )
            )}
        </ul>
      </SortableContext>
    </DndContext>
  )
}

type SortableItemProps = {
  exercise: Exercise
}

const SortableItem = ({ exercise }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exercise.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='flex justify-between rounded-md border-[1px] border-primary bg-white p-2'
    >
      {exercise.name}
      <GripVerticalIcon />
    </li>
  )
}
