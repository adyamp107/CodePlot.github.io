import pandas as pd
import concurrent.futures
import threading
import difflib
import re
import difflib
from statistics import mean
import math

lock = threading.Lock()
found_similarity_above_threshold = False

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

            future = executor.submit(calculate_similarity, start, end, client_input, data_array)
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
