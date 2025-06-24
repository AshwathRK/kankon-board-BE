const Status = require('./Model/status')

const defaultStatuses = [
    { status: 'To-Do', description: 'Tasks that are yet to be started' },
    { status: 'In Progress', description: 'Tasks that are currently being worked on' },
    { status: 'Done', description: 'Tasks that are completed' },
];

const seedDefaultStatuses = async () => {
    try {
        await Status.deleteMany({}); // Remove existing default statuses
        await Status.insertMany(defaultStatuses);
        console.log('Default statuses seeded successfully');
    } catch (error) {
        console.error('Error seeding default statuses:', error);
    }
};

seedDefaultStatuses();