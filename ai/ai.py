import pandas as pd
import concurrent.futures
import threading
import difflib
import re
from statistics import mean
import math
import random

lock = threading.Lock()
found_similarity_above_threshold = False

pairs = [
    [
        ["hello", "hi", "hello there", "hi there", "whatsup", "hey","yo"],
        ["Hello there","Hello, welcome to Codeplot", 
         "Hello, nice seeing you today","Hello, how can I help you today?","Hello, do you want to create an app today?","Hello, how can I assist you today?","Hello, welcome to Codeplot","Hello, nice seeing you today","Hi, how can I help you today?","Hi, do you want to create an app today?","Hi, how can I assist you today?","Hi, welcome to Codeplot","Hi, nice seeing you today"],
    ],
    [
        ["good morning","morning"],
        ["Good Morning", 
         "Morning"],
    ],
    [
        ["good afternoon","afternoon"],
        ["Good Afternoon", 
         "Afternoon"],
    ],
    [
        ["who are you", "what are you", "what"],
        ["I'm a simple ChatBot.", 
         "I'm a Python program that chats with you."],
    ],
    [
        ["how are you today", "how"],
        ["Im fine, thankyou", 
         "Im good, thankyou for asking"],
    ],
    [
        ["Where do you live", "where are you", "where"],
        ["I am a computer program designed to answer questions and provide information. I do not have access to your personal data or location."],
    ],
    [
        ["What is your purpose"], 
        ["I am a simple computer program that can assist you with the Python issues you are facing."],
    ],
    [
        ["can you tell me a joke", "Give me a joke", "joke", "tell me some funny jokes", "entertain me with a joke", "can you share a funny joke", "i need some humor, joke please", "hit me with a good joke"],
        ["Why do programmers always use dark themes? Because bugs are attracted to light.", 
         "Why is Voldemort so good with computers? He's fluent in Python.", 
         "Why do Python programmers have low self esteem? They're constantly comparing their self to other.", 
         "Why does python live on land? By the way, i am not good at zoology. Because it is above C-level.",
         "Why do python programmer prefer snakes to people? Because snakes don't't give 'SyntaxError: unexpected EOF while parsing' in the middle of a conversation!",
         "How do you comfort a JavaScript developer? You tell them Python is your first love.", "What do you call a python script that can sing and dance? Py-thon.", "Why did the Python developer go broke? Because they used up all their 'cents' on unnecessary libraries!", "Why do Python programmers prefer using snake_case for variable names? Because they don't't like Java!", "Why did the Python progammer stay calm under pressure? Because they had 'try' and 'except'ional skills!"],
    ],
    [
        ["good bye","bye","see you later","see you"],
        ["Good Bye", "See you later"],
    ],

]

def preprocess_text(text):
    text = re.sub(r'[^a-zA-Z\s]', '', text)    
    tokens = text.lower().split()
    return tokens

def read_dataset():
    url = 'https://raw.githubusercontent.com/adyamp107/python_datasets.github.io/master/dataset.csv'
    df = pd.read_csv(url)   
    pd.set_option('display.max_columns', None)
    pd.set_option('display.expand_frame_repr', False)
    pd.set_option('max_colwidth', None)
    return df

def calculate_similarity(start, end, client_input, data_array):    
    global found_similarity_above_threshold
    doc_client = client_input
    results = []

    for row in range(start, end):        
        if found_similarity_above_threshold:
            return results
        doc_dataset = data_array[row][1]

        tokens_client = preprocess_text(doc_client)
        tokens_dataset = preprocess_text(doc_dataset)
        common_words = set(tokens_client) & set(tokens_dataset)
        # step1
        similarity_percentage_tfidf = len(common_words) / min(len(tokens_client), len(tokens_dataset))
        # step2
        matcher = difflib.SequenceMatcher(None, doc_client, doc_dataset)
        similarity_ratio_char = matcher.ratio()
        # average
        similarity = mean([similarity_percentage_tfidf, similarity_ratio_char])
        new_data = {
            'similarity': similarity,
            'input': data_array[row][2],
            'output': data_array[row][3],
        }
        results.append(new_data)
        if similarity > 0.93:
            with lock:
                found_similarity_above_threshold = True
                return results
        
    return results

def get_answer(client_input):
    client_input_lower = client_input.lower()
    best_match = ""
    best_similarity = 0.0
    best_responses = []

    for pattern_group in pairs:
        pattern_list, responses = pattern_group
        for pattern in pattern_list:
            matcher = difflib.SequenceMatcher(None, client_input_lower, pattern)
            similarity = matcher.ratio()

            if similarity > best_similarity and similarity >= 0.6:
                best_similarity = similarity
                best_match = pattern
                best_responses = responses

    if best_match:
        create_answer = random.choice(best_responses)
        return create_answer

    else:
        global found_similarity_above_threshold
        found_similarity_above_threshold = False
        df= read_dataset()
        data_array = df.values
        num_threads = 5
        total_iterations = len(data_array)
        chunk_size = total_iterations // num_threads
        
        all_results = []
        
        with concurrent.futures.ThreadPoolExecutor(max_workers=num_threads) as executor:
            futures = []
            for i in range(num_threads):
                start = i * chunk_size
                end = (i + 1) * chunk_size if i < num_threads - 1 else total_iterations

                future = executor.submit(calculate_similarity, start, end, client_input_lower, data_array)
                futures.append(future)

            concurrent.futures.wait(futures)

        for future in futures:
            thread_results = future.result()
            all_results.extend(thread_results)

        all_results.sort(key=lambda x: x['similarity'], reverse=True)
        print(all_results[0]['input'])
        if isinstance(all_results[0]['input'], str):
            create_answer = f'''Sure, here is the python code:

Input: 
{all_results[0]['input']}

Python Code:
{all_results[0]['output']}

Hope this helps:)
            '''
        elif math.isnan(all_results[0]['input']):
            create_answer = f'''Sure, here is the python code:

Python Code:
{all_results[0]['output']}

Hope this helps:)
            '''
        return create_answer
