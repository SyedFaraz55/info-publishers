import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { TiInputChecked } from 'react-icons/ti'
const Quiz = ({ quiz, onComplete, setData }) => {

    const [finish, setFinish] = useState(false);
    const router = useRouter();
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(0)
    const handleSelect = (item, option) => {

        const copy = [...quiz.questions]
        const idx = copy.indexOf(item);
        const dup = copy[idx];
        const index = dup.answers?.indexOf(option)
        dup.answers[index].selected = true
        copy[idx].answers = dup.answers;
        dup.selected = true
        console.log(copy)
        setData({ ...quiz, questions: copy })

    }


    const handleQuizComplete = (userAnswers) => {
        const confirm = window.confirm("Are you sure to submit quiz?")
        if (!confirm) {
            return
        }
        const total = quiz?.questions?.reduce((acc, next) => {
            return acc += Number(next.point)
        }, 0)
        setTotal(total)
        // alert(`You scored ${score} out of ${total}`);
        setFinish(true)
    };


    return <Box>

        {!finish ? <Box mt={10}>
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
        </Box> : <Container style={{ marginTop: 20 }} mt={15}>
            <Box alignItems={"center"}>
                <Flex alignItems={"center"}>
                    <TiInputChecked size="100" color="#3181ce" />
                    <Box>
                        <Text fontSize={"2xl"}>Thanks !</Text>
                        <Text>Your response was submitted</Text>
                        <Text>Percentage : {(score * 100) / total}%</Text>
                        <Button onClick={() => router.back()} mt={5} variant={"solid"} colorScheme="blue" >Finish</Button>
                    </Box>
                </Flex>
            </Box>
        </Container>}


    </Box>
}

export default Quiz