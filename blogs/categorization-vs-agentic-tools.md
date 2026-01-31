When I started building AI projects, I did not spend much time thinking about AI logic or system architecture. Everything felt very simple. You call an API, send a prompt, and get a response. Most of the time, all you need is an API key from the provider. At this stage, nothing feels complicated, and it almost feels like AI development is only about writing good prompts.

After some time, my thinking changed. I realized that AI should not only respond. It should also act.

In real world applications, AI often needs to do actual work. This includes fetching live weather data, searching the web, reading or writing data in a database, or handling basic CRUD operations. To make this possible, AI needs more than language understanding. It needs access to tools, data sources, and permissions. I like to think of these permissions as powers given to AI. These powers are not unlimited freedom, but controlled access that allows AI to perform specific actions safely.

Once we start giving AI these powers, system design becomes much more important. The main question is no longer how to call an LLM. The real question becomes how to guide the AI to use the right tool at the right time. This is the point where we move from simple LLM API calls to AI systems that can actually get real work done.

Let us start by understanding one of the most important ideas in this journey.

## Categorization
<img width="1330" height="307" alt="Image" src="https://github.com/user-attachments/assets/a920de7d-4def-412d-91c5-f9644b4b7eff" />

Categorization is not a formal AI term. It is a concept I use based on how I design AI systems. The idea is very simple. Before AI does anything, it should first understand what kind of task it is dealing with.

Think about how humans handle daily tasks. If you need to go to the supermarket, you already know you will need a bike or some vehicle. If you want to watch a movie, you turn on the TV. If you have homework, you sit at your desk and study. Even though all of these are tasks, you naturally separate them in your mind based on what needs to be done.

AI should work in the same way.

When a user asks something, the AI should not immediately try to answer it. First, it should understand whether the request is about weather, web search, database work, or simple conversation. This thinking step is what categorization is all about.

In a well designed AI system, this responsibility is handled by a separate categorizer model. Its job is very focused. It reads the user query, understands the intent, and assigns a category to it. For example, if a user asks for today’s weather in Toronto, the categorizer identifies it as a weather related task.

Once the task is categorized, the system clearly knows which tool or API should be used next. This keeps the AI organized, predictable, and easy to scale. Categorization is the base that allows AI to move from just answering questions to performing meaningful actions in the real world.

## Agentic Tools
<img width="866" height="227" alt="Image" src="https://github.com/user-attachments/assets/028716b5-c710-4047-b5a5-5802b2b98cb6" />

After categorization, the next important question is who actually does the work.

This is where the agent comes in.

An agent is the decision maker of the system. It sits between the user and the final response. The agent does not directly answer the user. Instead, it understands the request, decides which tool is required, uses that tool, and then prepares the final response.

In the image above, the flow starts when a user asks something like today’s weather in Toronto, Canada. This request reaches the agent. From the categorization step, the agent already knows that this is a weather related task.

The agent has access to multiple tools. Each tool is built for a specific type of work. One tool fetches weather data, another handles web searches, and another interacts with the database. These tools are what I refer to as agentic tools.

Agentic tools are external capabilities that allow the agent to perform real actions. The key idea is that the agent chooses the tool by itself based on the task. In this example, the agent selects the weather tool, sends the required details like city and country, and waits for the result. The tool then communicates with an actual weather API and returns real data.

When the agent receives this data, it does not send it directly to the user. It first converts the raw information into a clean and readable response. This final response is what the user sees.

This approach makes the system powerful and flexible. The user never needs to know which tool was used. They simply ask a question. The agent handles the thinking, tool selection, execution, and response creation behind the scenes.

Agentic tools are what transform AI from a simple chat interface into an intelligent worker. They allow AI to interact with the real world while still staying controlled, predictable, and safe.
