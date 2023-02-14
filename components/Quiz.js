import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const Quiz = ({ quiz,onComplete,setData }) => {


    const [score, setScore] = useState(0)
    const handleSelect = (item, option) => {

        const copy = [...quiz.questions]
        const idx = copy.indexOf(item);
        const dup = copy[idx];
        const index = dup.answers?.indexOf(option)
        dup.answers[index].selected = true
        copy[idx].answers = dup.answers;
        dup.selected = true
        console.log(copy)
        setData({...quiz,questions:copy})

    }


    const handleQuizComplete = (userAnswers) => {
        const total =  quiz?.questions?.reduce((acc,next)=> {
            return acc+= Number(next.point)
        },0)

        alert(`You scored ${score} out of ${total}`);
    };


    return <Box mt={10}>
        <Heading>{quiz?.name || "Quiz"}</Heading>
        <Text>Total Questions: {3}</Text>
        {quiz?.questions?.map((item, index) => {
            return <Box key={index} bg={item.selected ? 'green' : ''} mt={5}>
                <Text p={2} color="#fff" background={"#071e22"} fontSize={"md"}>({index + 1}) {item.question}</Text>
                <Box bg={"#e6e9eb"}>
                    {item.answers?.map((ix, index) => {
                        return <Text key={index} bg={ix.selected ? 'green' : ''} color={ix.selected ? '#fff' : '#000'} cursor={"pointer"} p={2} border="1px" borderColor={"#f9f9f9"} onClick={() => {
                            if (!item.selected) {
                                handleSelect(item, ix);
                                if (item.correctAnswer == ix.name) {
                                    setScore(score + Number(item.point))
                                }
                            }
                        }}>{ix?.name}</Text>
                    })}
                </Box>
            </Box>
        })}

        <Button mt={5} onClick={handleQuizComplete} colorScheme="blue">Submit</Button>
    </Box>
}

export default Quiz